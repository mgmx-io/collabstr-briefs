from functools import wraps

from django.core.cache import cache
from django.http import JsonResponse

MAX_REQUESTS = 10
WINDOW_SECONDS = 60


def rate_limited(view):
    @wraps(view)
    def wrapper(request, *args, **kwargs):
        key = f"ratelimit:{request.META['REMOTE_ADDR']}"
        cache.add(key, 0, WINDOW_SECONDS)
        count = cache.incr(key)
        if count > MAX_REQUESTS:
            return JsonResponse({"error": "Too many requests"}, status=429)
        response = view(request, *args, **kwargs)
        response["X-RateLimit-Remaining"] = MAX_REQUESTS - count
        return response

    return wrapper
