# create
Website to create new iso images. You can try it out here at [codersos.github.io/create][site].

Related Work:
- [meilix-generator](https://github.com/fossasia/meilix-generator)

## Development

This website uses [Jekyll][jekyll] to build the page.

### Github Pages

When you fork the repository, you can view the webpage under your username using [github pages][gh-pages].
Example:
- Github user name = "CodersOS"
- website = "[CodersOS.github.io/create][site]"

Using Github pages might be slow and changes may not be propagated properly because of the browser cache.
However, this might be a solution for you, if installing Jekyll in the following chapter does not work.

### Development on your computer
You can [install Jekyll][install-jekyll] to see your changes.
When the installation is done:

1. Open the command line
   - Windows: type cmd into the start menu
   - Ubuntu: Press control+alt+t
2. Go to this repository with the cd command
   `cd create`
3. Serve the website
   `jekyll serve --trace`
4. Open [http://localhost:4000][jekyll-local]

### Useful things to know when developing

You can always ask in an [issue][issues] if or before you get frustrated.
This might include but is not limited to installing jekyll, coping with git, ... .

There are folders with `_` in the beginning.
They will not be shown on the site.
They have special meaning to jekyll.

- `_data` is where we can list all commands and servers for this website.

[install-jekyll]: http://jekyllrb.com/docs/installation/
[jekyll]: http://jekyllrb.com/
[issues]: https://github.com/CodersOS/create/issues
[site]: https://codersos.github.io/create/
[gh-pages]: http://pages.github.com/
[jekyll-local]: http://localhost:4000
