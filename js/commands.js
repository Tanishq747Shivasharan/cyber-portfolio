const commands = {

    help: () => `
        Available Commands:
        <br>
        help
        <br>
        about
        <br>
        skills
        <br>
        projects
        <br>
        neofetch
        <br>
        clear
    `,

    about: () => `
        Hi, I'm Tanishq.
        <br>
        Interested in Cybersecurity,
        Networking and Cloud Security.
    `,

    skills: () => `
        Networking
        <br>
        Linux
        <br>
        Python
        <br>
        Cybersecurity
    `,

    neofetch: () => `
<pre>
       .--.
      |o_o |
      |:_/ |
     //   \\\\
    (|     | )
   /'\\\\_   _/\\\\
   \\\\___)=(___/

${profile.name}@portfolio
-------------------------
Role: ${profile.role}
Education: ${profile.education}
Focus: Cybersecurity
</pre>
`
};