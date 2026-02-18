<?php

namespace App\Http\Controllers;
use App\Models\TowingRequest;

use Illuminate\Http\Request;

class TowingRequestController extends Controller
{
    public function index()
    {
    return TowingRequest::latest()->get();

    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'note' => 'nullable|string',
        ]);

        $towingRequest = TowingRequest::create($validated);

        return response()->json($towingRequest, 201);
    }
}