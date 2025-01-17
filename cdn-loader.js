(async function() {
  console.log("cdn-loader.js loaded")
  const currentScript = document.currentScript;

  console.log ('currentScript',currentScript)
  const cdnNames = currentScript.getAttribute('data-cdn');
  if (!cdnNames) return;

  const libraries = cdnNames.split(',').map(name => name.trim());

  try {
    const response = await fetch('cdn-config.json');
    console.log ('res libraries',response)
    const cdnConfig = await response.json();
    console.log ('cdnConfig',cdnConfig)

    libraries.forEach(lib => {
      const cdnUrl = cdnConfig.libraries[lib];
      if (cdnUrl) {
        const script = document.createElement('script');
        script.src = cdnUrl;
        script.async = true;
        document.head.appendChild(script);
        console.log(`Loaded: ${lib}`);
      } else {
        console.warn(`CDN URL for "${lib}" not found.`);
      }
    });
  } catch (error) {
    console.error('Error loading CDN configuration:', error);
  }
})();