from django.http import JsonResponse
from django.views.decorators.http import require_POST
from briefs.ratelimit import rate_limited
from briefs.schemas import BriefRequest
from briefs.services import llm


@require_POST
@rate_limited
def generate_brief(request):
    payload = BriefRequest.model_validate_json(request.body)

    data, metrics = llm.generate_brief(
        brand_name=payload.brand_name,
        platform=payload.platform,
        goal=payload.goal,
        tone=payload.tone,
    )

    return JsonResponse({**data, "metrics": metrics})
