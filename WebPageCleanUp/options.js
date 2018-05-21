// Saves active wait time to chrome.storage
function saveOptions() {
  var time = document.getElementById('time').value;
  chrome.storage.sync.set({
    activeTime: time
  }, function() {
    // Alert User of saved option
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    //reset status after 0.5 sec
    setTimeout(function() {
      status.textContent = '';
    }, 500);
  });
}

// Restores active wait time stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    activeTime: '3000'
  }, function(items) {
    document.getElementById('time').value = items.activeTime;
  });
}

document.getElementById('save').addEventListener('click',
    saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);