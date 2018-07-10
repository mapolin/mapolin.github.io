const SKILLS = {
    "title": `
 $$$$$$\\  $$\\   $$\\ $$$$$$\\ $$\\       $$\\       $$$$$$\\  
$$  __$$\\ $$ | $$  |\\_$$  _|$$ |      $$ |     $$  __$$\\ 
$$ /  \\__|$$ |$$  /   $$ |  $$ |      $$ |     $$ /  \\__|
\\$$$$$$\\  $$$$$  /    $$ |  $$ |      $$ |     \\$$$$$$\\  
 \\____$$\\ $$  $$<     $$ |  $$ |      $$ |      \\____$$\\ 
$$\\   $$ |$$ |\\$$\\    $$ |  $$ |      $$ |     $$\\   $$ |
\\$$$$$$  |$$ | \\$$\\ $$$$$$\\ $$$$$$$$\\ $$$$$$$$\\\\$$$$$$  |
 \\______/ \\__|  \\__|\\______|\\________|\\________|\\______/
`,
  "text": [`
  So, you want to know what I can do? That's easy enough 
  - nearly everything that uses Front-end technologies.
`, `
  I can do HTML, no surprise there...
  check this out:

    <article class="post">
      <h1 class="post--title">My cool new video!</h1>
      <div class="post--video-wrapper">
        <video>
          <source src="c00l_v1d.mp4" type="video/mp4">
          Looks like you need to upgrade the browser, uh?
        </video>
      </div>
      <div class="post--description">
        <p>A small video showcasing my awesome editing skills.</p>
      </div>
    </article>
`, `
  On top of that, I can find my way around css as well:

    p { margin: 10px 0; }
    h1 { margin: 5px 0 15px 0; }

    .post {
      margin: 20px 0;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, .3);
      background: #fff;
      box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, .3);
      font-family: 'Roboto', sans-serif;
      color: #202020;
    }

    .post--title {
      font-weight: 600;
      font-size: 1.5em;
      color: #111;
      margin: 5px 0 15px 0;
    }
`, `
    .post--description {
      font-weight: 300;
      font-size: 1em;
    }

    .post--video-wrapper {
      overflow: hidden;
      height: 0;
      width: 100%;
      position: relative;
      padding-bottom: 56.25%;
    }

    .post--video-wrapper video {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
`, `
  I can do fancy stuff like this...

  <script>
    CONSTANTS.USER_NAME = prompt("So what's your name?");
    this.user_name = CONSTANTS.USER_NAME;
  </script>

  Click the button to see what I'm talking about!
`]
};

export { SKILLS }