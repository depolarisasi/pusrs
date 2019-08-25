<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Responses\Entity\BaseErrorResponse;
class BaseRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    protected function failedValidation(Validator $validator) 
    {
        $error = $validator->errors()->first();
        $code = Response::HTTP_UNPROCESSABLE_ENTITY;
        throw new HttpResponseException((new BaseErrorResponse($code, $error))->toResponse()); 
    }
}