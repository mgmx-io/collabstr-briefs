import anthropic
from django.http import JsonResponse
from pydantic import ValidationError
from briefs.exceptions import ApiError


class ApiErrorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_exception(self, request, exception):
        if isinstance(exception, ApiError):
            return JsonResponse(exception.payload, status=exception.status)

        if isinstance(exception, ValidationError):
            errors = exception.errors(
                include_url=False, include_context=False, include_input=False
            )
            return JsonResponse({"errors": errors}, status=400)

        if isinstance(exception, anthropic.APIError):
            return JsonResponse(
                {"error": "Brief generation failed. Try again."}, status=502
            )
        return None
