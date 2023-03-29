export default function CRnotification() {
    setInterval(() => {
        window.dispatchEvent(
            new CustomEvent('fakeNotification', {
                detail: 'Content of fakeNotification '
            })
        )
        
    }, 10000)
}