<?php

namespace App\Http\Requests\Users;

use App\Rules\MatchOldPassword;
use App\Rules\CheckSamePassword;
use Illuminate\Foundation\Http\FormRequest;

class ProfilePasswordUpdateRequest extends FormRequest
{
    private const PROFILE_UPDATE = 'settings/profile';
    private const PASSWORD_UPDATE = 'settings/password';

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
        $path = preg_replace('/api\//', '', $this->path());

        $rules = [];

        switch ($path) {
            case self::PASSWORD_UPDATE:
                $rules = [
                    'old_password' => ['required', 'string', new MatchOldPassword],
                    'password' => [
                        'required', 'string', 'confirmed', 'min:8', new CheckSamePassword
                    ],
                ];
                break;

            case self::PROFILE_UPDATE:
                $rules = [
                    'name' => ['sometimes', 'string', 'max:255'],
                    'bio' => ['string', 'nullable'],
                    'phone' => ['sometimes', 'string', 'size:11', 'nullable'],
                    'image' => [
                        'sometimes',
                        'mimes:jpeg,gif,bmp,png', 'max:1000', 'nullable'
                    ],
                ];
                break;

            default:
                break;
        }

        return $rules;
    }
}
