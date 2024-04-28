package nh.recipify.domain;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NewFeedback(@NotBlank String commenter,
                          @NotNull @Min(0) @Max(5) int stars,
                          @NotBlank String comment) {
}