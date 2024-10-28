k8s_yaml("k8s/signup-d.yaml") # this line tells tilt to apply the k8s/signup-d.yaml file and to monitor it (simply put, it tells tilt 'this file is under your responsibility')
docker_build("signup", "services/signup", live_update=[sync("services/signup/src", "/app/src")]) # this line tells tilt to build the docker image of the signup service and to monitor the src folder for changes (basically, 'build it, rebuild in case of changes, specifically in the src folder just inject the changes to avoid unnecessary rebuild for every code change')
# make sure debugging port is equal to the launch file of the application (9001 in this case)
# make sure to update the port is wright when using post-man (3001 in this case) 
k8s_resource('signup-d', port_forwards=['3001:3000','9001:9229']) # this line tells tilt to create a port-forward from the machine to the containers (used for: attaching the debugger, testing the service, connecting to rabbitmq if the services run outside the cluster, etc.)

k8s_yaml("k8s/auth-d.yaml")
docker_build("auth", "services/auth", live_update=[sync("services/auth/src", "/app/src")])
k8s_resource('auth-d', port_forwards=['3002:3000','9002:9229'])

k8s_yaml("k8s/consultant-d.yaml")
docker_build("consultant", "services/consultant", live_update=[sync("services/consultant/src", "/app/src")])
k8s_resource('consultant-d', port_forwards=['3003:3000','9003:9229'])

k8s_yaml("k8s/ava-d.yaml")
docker_build("ava", "services/ava", live_update=[sync("services/ava/src", "/app/src")])
k8s_resource('ava-d', port_forwards=['3004:3000','9004:9229'])

k8s_yaml("k8s/search-d.yaml")
docker_build("search", "services/search", live_update=[sync("services/search/src", "/app/src")])
k8s_resource('search-d', port_forwards=['3005:3000','9005:9229'])

k8s_yaml("k8s/booking-d.yaml")
docker_build("booking", "services/booking", live_update=[sync("services/booking/src", "/app/src")])
k8s_resource('booking-d', port_forwards=['3006:3000','9006:9229'])

k8s_yaml("k8s/chat-d.yaml")
docker_build("chat", "services/chat", live_update=[sync("services/chat/src", "/app/src")])
k8s_resource('chat-d', port_forwards=['3007:3000','9007:9229'])

k8s_yaml("k8s/notify-d.yaml")
docker_build("notify", "services/notify", live_update=[sync("services/notify/src", "/app/src")])
k8s_resource('notify-d', port_forwards=['3008:3000','9008:9229'])

k8s_yaml("k8s/call-d.yaml")
docker_build("call", "services/call", live_update=[sync("services/call/src", "/app/src")])
k8s_resource('call-d', port_forwards=['3009:3000','9009:9229'])

k8s_yaml("k8s/payment-d.yaml")
docker_build("payment", "services/payment", live_update=[sync("services/payment/src", "/app/src")])
k8s_resource('payment-d', port_forwards=['3010:3000','9010:9229'])

k8s_yaml("k8s/review-d.yaml")
docker_build("review", "services/review", live_update=[sync("services/review/src", "/app/src")])
k8s_resource('review-d', port_forwards=['3011:3000','9011:9229'])

k8s_yaml("k8s/send-d.yaml")
docker_build("send", "services/send", live_update=[sync("services/send/src", "/app/src")])
k8s_resource('send-d', port_forwards=['3012:3000','9012:9229'])

k8s_yaml("k8s/socket-d.yaml")
docker_build("socket", "services/socket", live_update=[sync("services/socket/src", "/app/src")])
k8s_resource('socket-d', port_forwards=['3013:3000','9013:9229'])