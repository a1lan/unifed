/*
 * CS3099 Group A3
 */

import zxcvbn from "zxcvbn";

interface PasswordValidationResult {
  valid: boolean;
  warning?: string;
  suggestions: string[];
}

export function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9-_]{1,24}$/.test(username);
}

export function validateName(name: string): boolean {
  return /^.{1,64}$/.test(name);
}

export function validatePassword(password: string): PasswordValidationResult {
  const result = zxcvbn(password);
  const valid = result.score >= 3;

  return {
    valid,
    warning: valid ? undefined : result.feedback.warning,
    suggestions: result.feedback.suggestions,
  };
}