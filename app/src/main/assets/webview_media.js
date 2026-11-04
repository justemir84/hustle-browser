// WebView: starts the scripts of the frame (media_controls.js, page_videos.js, run before this one) with the
// hustleBrowserMedia object the app adds to every frame (WebViewMediaControls). Without that object (old WebViews) it
// runs in the main frame only, and the app calls hustleBrowserMediaCommand itself.
(function() {
    if (window.hustleBrowserMediaCommand) return;
    var channel = window.hustleBrowserMedia;
    var send = channel ? function(message) { channel.postMessage(message); } : null;
    window.hustleBrowserMediaCommand = hustleBrowserWatchMedia(send);
    if (!channel) return;
    channel.onmessage = function(e) {
        window.hustleBrowserMediaCommand(e.data);
    };
    hustleBrowserWatchPageVideos(send);
})();
