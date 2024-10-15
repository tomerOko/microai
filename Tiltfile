k8s_yaml("k8s/signup-d.yaml")
docker_build("signup", "services/signup", live_update=[sync("services/signup/src", "/app/src")])
# make sure debugging port is equal to the launch file of the application (9001 in this case)
# make sure to update the port is wright when using post-man (3001 in this case) 
k8s_resource('signup-d', port_forwards=['3001:3000','9001:9229']) 

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

k8s_yaml("k8s/payments-d.yaml")
docker_build("payments", "services/payments", live_update=[sync("services/payments/src", "/app/src")])
k8s_resource('payments-d', port_forwards=['3010:3000','9010:9229'])

k8s_yaml("k8s/rating-d.yaml")
docker_build("rating", "services/rating", live_update=[sync("services/rating/src", "/app/src")])
k8s_resource('rating-d', port_forwards=['3011:3000','9011:9229'])

k8s_yaml("k8s/send-d.yaml")
docker_build("send", "services/send", live_update=[sync("services/send/src", "/app/src")])
k8s_resource('send-d', port_forwards=['3012:3000','9012:9229'])

k8s_yaml("k8s/socket-d.yaml")
docker_build("socket", "services/socket", live_update=[sync("services/socket/src", "/app/src")])
k8s_resource('socket-d', port_forwards=['3013:3000','9013:9229'])