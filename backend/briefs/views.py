from django.http import JsonResponse
from django.views.decorators.http import require_POST


@require_POST
def generate_brief(request):
    return JsonResponse(
        {
            "brief": "Dummy brief.",
            "angles": ["Angle 1", "Angle 2", "Angle 3"],
            "criteria": ["Criterion 1", "Criterion 2", "Criterion 3"],
        }
    )
