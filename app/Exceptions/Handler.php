<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     *  Customize the prepareJsonResponse response message
     */
    protected function prepareJsonResponse($request, Throwable $e)
    {
        return response()->json([
            'error' => [
                'title' => Str::title(Str::snake(class_basename(
                    $e
                ), ' ')),
                'details' => $e->getMessage(),
            ]
        ], $this->isHttpException($e) ? $e->getStatusCode() : 500);
    }

    /**
     *  Customize the invalidJson reponse message
     */
    protected function invalidJson($request, ValidationException $exception)
    {
        $errors = (new Collection($exception->validator->errors()))
            ->map(function ($error, $key) {
                return [
                    $key => $error[0],
                ];
            })
            ->values();

        return response()->json([
            'errors' => [
                'title' => 'Validation Error',
                'details' => $errors
            ],
        ], $exception->status);
    }

    protected function unauthenticated(
        $request,
        AuthenticationException $exception
    ) {
        if ($request->expectsJson()) {
            return response()->json([
                'error' => [
                        'title' => 'Unauthenticated',
                        'details' => 'You are not authenticated',
                ]
            ], 403);
        }
        return redirect()->guest($exception->redirectTo() ?? route('login'));
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if (
            $exception instanceof QueryException ||
            $exception instanceof ModelNotFoundException
        ) {
            $exception = new NotFoundHttpException(
                'Resource not found',
                null,
                404
            );
        }

        return parent::render($request, $exception);
    }
}
