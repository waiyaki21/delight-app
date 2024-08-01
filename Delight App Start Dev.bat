::[Bat To Exe Converter]
::
::fBE1pAF6MU+EWGLUoRhgeUEAFESyEVb6b5YO7env5uSA4mglcYI=
::fBE1pAF6MU+EWGLUoRhgeUEAFESyEVb6b5MV5O317ueC+A0+Dt4Ka4rJyYi5IekK607tNb0o2mxTlvctHAt8fwaqUiM7qm9OilCAOteg4li3awad61t+Hn1x5w==
::fBE1pAF6MU+EWGLUoRhgeUEAFESyEVb6b5MT+uX6+7DH8R9ddusrOJOb+buAM+8f7wWsQ58+33hWnYJs
::fBE1pAF6MU+EWGLUoRhgeUEAFUSyEVb6b5QY7OH16KqOoUITDqIcIrPuybGcM9wk60z9dJ0kllFflN0FAid8ewGgegAklV1BvmuKO4evqhz1T0XJw1gjHmtgjmLcnxcIY9tnlc9D/iGw/UrymqsEkUvmTZUeAGHtyK9UMcQHwQSxfwnbmbtaRfquYr7mDXjBIGZRwj6DpKgK
::fBE1pAF6MU+EWGLUoRhgeUEAFUSyEVb6b5QY7OH16KqVp14SQfA8fZyVlPrOD8tz
::fBE1pAF6MU+EWGLUoRhgeUEBHESyEVb6b4UO5+v+/PnHpEQTXfE3fYu7
::YAwzoRdxOk+EWAnk
::fBw5plQjdCyDJGyX8VAjFCxVRR2DN2L6LbAQ/uH1086CsUYJW/IDS4zT1buCYNMK+VHheNYIxWlflt8FDRdLQiGoZgA7pS5vt2qEMMqZvRuheVGa2kU1DCVnhGvfgyd7adBnlI0K0C/e
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+JeA==
::cxY6rQJ7JhzQF1fEqQJQ
::ZQ05rAF9IBncCkqN+0xwdVs0
::ZQ05rAF9IAHYFVzEqQJQ
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJGyX8VAjFCxVRR2DN2L6LbAQ/uH1086CsUYJW/IDS4zT1buCYNMK+VHheNYIxWlflt8FDRdLQiGoZgA7pS5vt2qEMMqZvRuheVGa2m0dKFpHk2LCmA8+dp1tgsZj
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983
if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit
@ECHO OFF 
:: This batch file boots up the school managment system quickly!
TITLE DELIGHT APP BOOT UP
START /min C:\xampp\xampp_start.EXE
timeout /t 20 /nobreak
@REM START /min C:\Program Files\VSCode\Code.EXE
timeout /t 20 /nobreak
START http://localhost:8000/
exit