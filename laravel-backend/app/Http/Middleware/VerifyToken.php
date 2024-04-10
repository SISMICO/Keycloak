<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken(); // Extract the token from the request headers
        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        // Validate the token (you can use JWT validation or any other method)
        // Example: Check if the token is valid using your custom logic
        if (!YourCustomTokenValidator::isValid($token)) {
            return response()->json(['message' => 'Invalid token'], 401);
        }
        
        return $next($request);
    }
    
    private static bool ValidateToken(string authToken)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = GetValidationParameters();

        SecurityToken validatedToken;
        IPrincipal principal = tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
        // You can access claims from the validated token: principal.Claims

        // Add custom validation logic if needed

        return true; // Token is valid
    }
}
