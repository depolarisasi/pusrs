<?php
namespace App\Http\Requests\Auth;
use App\Http\Requests\BaseRequest;
class RegisterRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'name' => 'required|string|max:50',
            'password' => 'required|confirmed',
            'role' => 'required|int'
        ];
    }
    public function messages()
    {
        return [
            'email.required' => 'Email is required!',
            'email.unique' => 'Email is already exist',
            'name.required' => 'Name is required!',
            'password.required' => 'Password is required!'
        ];
    }
}