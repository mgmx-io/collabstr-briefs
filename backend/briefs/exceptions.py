class ApiError(Exception):
    status = 500

    def __init__(self, payload):
        super().__init__(payload)
        self.payload = payload


class RateLimitExceeded(ApiError):
    status = 429

    def __init__(self):
        super().__init__({"error": "Too many requests"})


class BriefRejected(ApiError):
    status = 422

    def __init__(self, reason):
        super().__init__({"error": reason})
