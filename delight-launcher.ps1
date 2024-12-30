# write-output "Ppkaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah!!"

# Start XAMPP
Start-Process -FilePath "C:\xampp\xampp_start.exe"

# Open Windows Terminal with three tabs
wt --window 0 `
    -p "Windows Powershell" -d . powershell -noExit "php artisan serve" `
    new-tab -p "Windows Powershell" -d . powershell -noExit "npm run watch" `
    new-tab -p "Windows Powershell" -d . powershell -noExit "lt --port 8000 --subdomain delight-electronics"

# Wait for services to start
Start-Sleep -Seconds 10

# Open the Laravel application in the default browser
Start-Process -FilePath "http://localhost:8000/"
