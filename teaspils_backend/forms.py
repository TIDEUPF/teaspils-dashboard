from django import forms

class LoginForm(forms.Form):
    partner_name = forms.CharField(label='Partner name')
    secret_word = forms.CharField(label='Secret Word', max_length=12)

class ObservationForm(forms.Form):
    plant_id = forms.IntegerField(label="Plant Id")
    name = forms.CharField(label='Given Name')
    observation = forms.CharField(label='Observations')
    attachedfile = forms.FileField(label='Attached file', allow_empty_file=True, required=False)

class MeasureObservationForm(forms.Form):
    plant_id = forms.IntegerField(label="Plant Id")
    single_measure = forms.CharField(required=False)
    name = forms.CharField(label='Given Name')
    observation = forms.CharField(label='Observations')
    attachedfile = forms.FileField(label='Attached file', allow_empty_file=True, required=False)
