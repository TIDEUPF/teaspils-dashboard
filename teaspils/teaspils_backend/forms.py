from django import forms

class LoginForm(forms.Form):
    course_id = forms.IntegerField(label='Course Id')
    secret_word = forms.CharField(label='Secret Word', max_length=12)

class ObservationForm(forms.Form):
    plant_id = forms.IntegerField(label="Plant Id")
    name = forms.CharField(label='Given Name')
    observation = forms.CharField(label='Observations')
    attachedfile = forms.FileField(label='Attached file', allow_empty_file=True, required=False)