#!/bin/bash

# Apply Terraform changes
terraform apply -auto-approve

# port forward the mongo databases to enable local access (with studio 3t for example)

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/signup-mon 27001:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/auth-mon 27002:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/consultant-mon 27003:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/ava-mon 27004:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/search-mon 27005:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/booking-mon 27006:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/chat-mon 27007:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/notify-mon 27008:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/call-mon 27009:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/payments-mon 27010:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/rating-mon 27011:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/send-mon 27012:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/socket-mon 27013:27017" 
end tell'

# port forward the rabbitmq management console (http://localhost:15672)
osascript -e 'tell app "Terminal"
    do script "kubectl port-forward svc/rabbitmq 15672:15672"
end tell'

# port forward the rabbitmq queueing service to enable local access
osascript -e 'tell app "Terminal"
    do script "kubectl port-forward svc/rabbitmq 5672:5672"
end tell'


# Run tilt up
tilt up


# npm uninstall common-lib-tomeroko3 events-tomeroko3 
# npm install common-lib-tomeroko3 events-tomeroko3 