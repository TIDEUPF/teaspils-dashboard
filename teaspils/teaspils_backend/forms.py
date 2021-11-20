from django import forms

class LoginForm(forms.Form):
    course_id = forms.IntegerField(label='Course Id')
    secret_word = forms.CharField(label='Secret Word', max_length=5)

class ObservationForm(forms.Form):
    plant_id = forms.IntegerField(label="Plant Id")
    name = forms.CharField(label='Given Name')
    observation = forms.CharField(label='Observations')