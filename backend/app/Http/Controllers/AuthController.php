<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function tokenValidation()
    {
        return response()->json(['status' => 200, 'message' => 'token valid'], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255','email', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['status' => 201, 'message' => 'register success'], 201);
    }

    public function login(Request $request) 
    {
        $request->validate([
            'email' => ['required', 'string', 'max:255', 'email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        if(!Auth::attempt($request->only('email', 'password')))
            return response()->json(['status' => 401, 'message' => 'invalid login details'], 401);
        
        $token = $request->user()->createToken('authToken')->plainTextToken;

        return response()->json(['status' => 200, 'message' => 'login success', 'token' => $token], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['status' => 200, 'message' => 'logout success'], 200);
    }
}
