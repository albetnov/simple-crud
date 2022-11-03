<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\EditPasswordRequest;
use App\Http\Requests\EditUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::paginate()->withQueryString();

        return Inertia::render('Users/UserList', [
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        User::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $find = User::findOrFail($id);

        if (!$find) {
            return response()->json([
                'message' => 'Data not found.'
            ], 404);
        }

        return $find;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditUserRequest $request, $id)
    {
        $find = User::findOrFail($id);
        if (!$find) {
            return response()->json([
                'message' => 'Data not found.'
            ], 404);
        }

        $find->update($request->validated());

        return to_route('users.index');
    }

    /**
     * Update user password
     */
    public function passwordChange(EditPasswordRequest $request, $id)
    {
        $find = User::findOrFail($id);

        if (!$find) {
            return response()->json([
                'message' => 'Data not found.'
            ], 404);
        }

        $find->update($request->getEncryptedField());

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find = User::findOrFail($id);
        if (!$find) {
            return response()->json([
                'message' => 'Data not found.'
            ], 404);
        }

        $find->delete();
    }
}
