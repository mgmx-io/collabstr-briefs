import json

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from briefs.services import llm


@require_POST
def generate_brief(request):
    data = json.loads(request.body)
    result = llm.generate_brief(
        brand_name=data["brand_name"],
        platform=data["platform"],
        goal=data["goal"],
        tone=data["tone"],
    )
    return JsonResponse(result)
