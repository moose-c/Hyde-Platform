from django.shortcuts import render 
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
import datetime


def current_datetime(request):
    now = datetime.datetime.now()
    t = get_template('current_datetime.html')
    html = t.render({'current_date': now})
    return HttpResponse(html)

def hours_ahead(request, offset):
    dt = datetime.datetime.now() + datetime.timedelta(hours=offset)
    return render(request, "hours_ahead.html", {'hour_offset':offset, 'next_time': dt})