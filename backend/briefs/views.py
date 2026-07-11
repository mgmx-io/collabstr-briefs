from django.http import JsonResponse
from django.views.decorators.http import require_POST
from pydantic import ValidationError
from briefs.ratelimit import rate_limited
from briefs.schemas import BriefRequest
from briefs.services import llm


def validation_error_response(e):
    errors = e.errors(include_url=False, include_context=False, include_input=False)
    return JsonResponse({"errors": errors}, status=400)


@require_POST
@rate_limited
def generate_brief(request):
    try:
        payload = BriefRequest.model_validate_json(request.body)
    except ValidationError as e:
        return validation_error_response(e)

    data, metrics = llm.generate_brief(
        brand_name=payload.brand_name,
        platform=payload.platform,
        goal=payload.goal,
        tone=payload.tone,
    )

    return JsonResponse({**data, "metrics": metrics})
