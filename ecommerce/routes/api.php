<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\AuthController;

// Define API routes for Product resource
Route::apiResource('products', ProductController::class);

// Define the login route
Route::post('/login', [AuthController::class, 'login']);
