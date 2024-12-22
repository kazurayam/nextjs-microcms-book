#!/usr/local/bin/bash

# 写経したコードを本物と見比べる

function mydiff() {
    bookdir="$HOME/tmp/nextjs-website-sample"
    mydir="$HOME/github/nextjs-microcms-book/my-next-project"
    diff -u "$bookdir/$1" "$mydir/$1"
}

#mydiff "app/_components/Article/index.module.css"
mydiff "app/_components/Article/index.tsx"

#mydiff "app/_components/ButtonLink/index.module.css"
#mydiff "app/_components/ButtonLink/index.tsx"
#mydiff "app/_components/Category/index.module.css"
#mydiff "app/_components/Category/index.tsx"
#mydiff "app/_components/Date/index.module.css"
#mydiff "app/_components/Date/index.tsx"
#mydiff "app/_components/Footer/index.module.css"
#mydiff "app/_components/Footer/index.tsx"
##mydiff "app/_components/Header/index.module.css"
##mydiff "app/_components/Header/index.tsx"

##mydiff "app/_components/Hero/index.module.css"
##mydiff "app/_components/Hero/index.tsx"

##mydiff "app/_components/NewsList/index.module.css"
##mydiff "app/_components/NewsList/index.tsx"

#mydiff "app/_components/Sheet/index.module.css"
#mydiff "app/_components/Sheet/index.tsx"
#mydiff "app/_libs/microcms.module.css"
#mydiff "app/_libs/microcms.tsx"

#mydiff "app/members/layout.tsx"
##mydiff "app/members/page.module.css"
##mydiff "app/members/page.tsx"

#mydiff "app/news/layout.tsx"
#mydiff "app/news/page.module.tsx"
#mydiff "app/news/page.tsx"

##mydiff "app/globals.css"
##mydiff "app/layout.tsx"
#mydiff "app/not-found.module.css"
#mydiff "app/not-found.tsx"
##mydiff "app/page.module.css"
##mydiff "app/page.tsx"
