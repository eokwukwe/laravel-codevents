<?php

namespace App\Http\Requests\Events;

use Illuminate\Foundation\Http\FormRequest;

class EventsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // dd($this->method('post'));
        $method = $this->method();

        return [
            'date' => ['required', 'date'],
            'category' => ['required', 'string'],
            'venue' => ['required', 'string'],
            'description' => ['required', 'string', 'min:10'],
            'title' => $method === 'POST' ? [
                'required', 'string', 'min:10', 'max:255', 'unique:App\Models\Event,title'
            ] : ['required', 'string', 'min:10', 'max:255'],
            'venue_lat' => [
                'required',
                'regex:/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?)$/'
            ],
            'venue_lng' => [
                'required',
                'regex:/^[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/'
            ],
        ];
    }
}
