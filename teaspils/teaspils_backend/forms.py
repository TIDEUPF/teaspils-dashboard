from django import forms

class LoginForm(forms.Form):
    course_id = forms.IntegerField(label='Course Id')
    secret_word = forms.CharField(label='Secret Word', max_length=5)