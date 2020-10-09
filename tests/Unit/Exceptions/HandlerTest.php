<?php

namespace Tests\Unit\Exceptions;

use Tests\TestCase;
use App\Exceptions\Handler;
use Illuminate\Http\Request;
use Illuminate\Testing\TestResponse;
use Illuminate\Database\QueryException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HandlerTest extends TestCase
{
    /** @test */
    public function
    it_converts_an_exception_into_the_customized_error_response()
    {
        /** @var Handler $handler */
        $handler = app(Handler::class);

        $request = Request::create('/test', 'GET');
        $request->headers->set('accept', 'application/json');

        $exception = new \Exception('Test exception.');
        $response = $handler->render($request, $exception);

        TestResponse::fromBaseResponse($response)->assertJson([
            'error' => [
                'title' => 'Exception',
                'details' => 'Test exception.',
            ]
        ])->assertStatus(500);
    }

    /** @test */
    public function
    it_converts_an_http_exception_into_the_customized_error_response()
    {
        /** @var Handler $handler */
        $handler = app(Handler::class);

        $request = Request::create('/test', 'GET');
        $request->headers->set('accept', 'application/json');

        $exception = new HttpException(404, 'Not found', null, [], 404);
        $response = $handler->render($request, $exception);

        TestResponse::fromBaseResponse($response)->assertJson([
            'error' => [
                'title' => 'Http Exception',
                'details' => 'Not found',
            ]
        ])->assertStatus(404);
    }

    /** @test */
    public function it_converts_an_unauthenticated_exception_into_the_customized_error_response()
    {
        /** @var Handler $handler */
        $handler = app(Handler::class);

        $request = Request::create('/test', 'GET');
        $request->headers->set('accept', 'application/json');

        $exception = new AuthenticationException();

        $response = $handler->render($request, $exception);
        TestResponse::fromBaseResponse($response)->assertJson([
            'error' => [
                'title'   => 'Unauthenticated',
                'details' => 'You are not authenticated',
            ]
        ]);
    }

    /** @test */
    public function
    it_converts_a_query_exception_into_a_not_found_exception()
    {
        /** @var Handler $handler */
        $handler = app(Handler::class);

        $request = Request::create('/test', 'GET');
        $request->headers->set('accept', 'application/json');

        $exception = new QueryException(
            'select ? from ?',
            ['name', 'nothing'],
            new \Exception('')
        );

        $response = $handler->render($request, $exception);
        TestResponse::fromBaseResponse($response)->assertJson([
            'error' => [
                'title' => 'Not Found Http Exception',
                'details' => 'Resource not found',
            ]
        ]);
    }
}
