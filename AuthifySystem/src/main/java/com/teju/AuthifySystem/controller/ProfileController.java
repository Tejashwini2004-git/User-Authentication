package com.teju.AuthifySystem.controller;

import com.teju.AuthifySystem.io.ProfileRequest;
import com.teju.AuthifySystem.io.ProfileResponse;
import com.teju.AuthifySystem.service.EmailService;
import com.teju.AuthifySystem.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping("/register")
@ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request){
        ProfileResponse response= profileService.createProfile(request);
    emailService.sendWelcomeEmail(response.getEmail(),response.getName());
        return response;
}
@GetMapping("/profile")
public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
return profileService.getProfile(email);
}
}
