const videos = [...document.querySelectorAll('video')];
const status = document.getElementById('player-status');
for (const video of videos) {
  video.addEventListener('play', () => { videos.forEach(other => { if (other !== video) other.pause(); }); status.textContent = ''; });
  video.addEventListener('error', () => { status.textContent = 'De video kon niet worden geladen. Probeer de MP4 via de downloadknop te openen.'; });
}
for (const button of document.querySelectorAll('[data-fullscreen]')) {
  button.addEventListener('click', async () => {
    const video = document.getElementById(button.dataset.fullscreen);
    status.textContent = '';
    try {
      if (video.requestFullscreen) await video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      else { status.textContent = 'Gebruik de knop voor volledig scherm in de videospeler.'; }
      await video.play();
    } catch (error) {
      status.textContent = 'Gebruik de afspeelknop of de knop voor volledig scherm in de video.';
    }
  });
}

// Offline pages cannot fetch file:// media. Load a local, lossless data copy instead.
async function videoFile(button) {
  if (location.protocol !== 'file:') {
    const response = await fetch(button.dataset.download);
    if (!response.ok) throw new Error('Video niet bereikbaar.');
    return new Blob([await response.arrayBuffer()], {type: 'application/octet-stream'});
  }
  const key = button.dataset.filename.includes('_12.') ? '12' : '10';
  if (!window.offlineVideoData?.[key]) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `media/offline-${key}.js?v=17min`;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Lokaal downloadbestand ontbreekt.'));
      document.head.append(script);
    });
  }
  const bytes = Uint8Array.from(atob(window.offlineVideoData[key]), c => c.charCodeAt(0));
  return new Blob([bytes], {type: 'application/octet-stream'});
}
for (const button of document.querySelectorAll('[data-download]')) {
  const notice = document.createElement('p');
  notice.className = 'download-notice';
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  button.closest('.card-body').append(notice);
  button.addEventListener('click', async () => {
    button.disabled = true;
    notice.textContent = 'Download voorbereiden…';
    let handle;
    let writable;
    try {
      if (typeof window.showSaveFilePicker === 'function') {
        notice.textContent = 'Kies waar u de MP4 wilt opslaan.';
        handle = await window.showSaveFilePicker({
          suggestedName: button.dataset.filename,
          startIn: 'downloads',
          types: [{description: 'MP4-video', accept: {'video/mp4': ['.mp4']}}]
        });
      }
      notice.textContent = 'Bestand wordt klaargezet…';
      const blob = await videoFile(button);
      if (handle) {
        notice.textContent = 'Bestand wordt opgeslagen…';
        writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        writable = null;
        notice.textContent = `Opslaan voltooid: ${handle.name}. Het bestand staat in de map die u zojuist hebt gekozen.`;
      } else {
        const url = URL.createObjectURL(blob);
        const download = document.createElement('a');
        download.href = url;
        download.download = button.dataset.filename;
        download.hidden = true;
        document.body.append(download);
        download.click();
        download.remove();
        setTimeout(() => URL.revokeObjectURL(url), 120000);
        notice.textContent = `Download aangeboden: ${button.dataset.filename}. Controleer het downloadoverzicht van uw browser voor de voltooiing en de opslagmap (meestal Downloads).`;
      }
    } catch (error) {
      if (writable) { try { await writable.abort(); } catch {} }
      notice.textContent = error.name === 'AbortError'
        ? 'Opslaan geannuleerd. U kunt opnieuw op Download MP4 klikken.'
        : 'Opslaan is niet gelukt. Probeer het opnieuw; controleer of de map media naast deze pagina staat.';
    } finally { button.disabled = false; }
  });
}
