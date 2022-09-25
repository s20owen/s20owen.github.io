const button = document.querySelector("button");

button.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted"){
            new Notification("example notification", {
                body: "this is more text",    
            })
        }
    })
})