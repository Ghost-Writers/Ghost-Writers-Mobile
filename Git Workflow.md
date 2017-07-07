Very simple and quick git workflow:

INITIAL SET UP:
1. Fork the group repo: https://github.com/Ghost-Writers/
2. Clone down YOUR FORK from github, NOT from the org (eg git clone http://github.com/ShoNozaki/Ghost-Writers-Mobile)
3. Set up remote connection to the org's git from local branch: git remote add central https://github.com/Ghost-Writers/Ghost-Writers-Mobile
4. Make sure the remote connection is set up properly: git remote -v


NORMAL WORKFLOW AFTER THE SET UP:
1. git checkout master
2. git pull --rebase central master

Steps 1 + 2 are to make sure that YOUR MASTER BRANCH is up to date

3. git checkout -b [YOUR BRANCH NAME HERE] 
4. git rebase master
5. add/commit to git

Steps 3 + 4 + 5 are to ensure that before you add any changes FROM YOUR WORK BRANCH that your WORK BRANCH is UP TO DATE.

6. git push origin [YOUR BRANCH NAME HERE]
7. submit PR via website
See “ExamplePRScreeshot” image in the git for reference.
Base fork should be set to the org git master branch and the headfork portion should be set to your git work branch

8. ping Sho via slack with @shozaki



RULES OF THUMB:
1. You should never add/commit any work from YOUR MASTER BRANCH
2. Make sure to git pull —rebase central master often from YOUR WORK BRANCH AND MASTER BRANCH
3. If PR hasn’t been closed yet, feel free to keep working on the same project, any additional changes will still be added to the same PR if you do git add/commit
4. You will likely be repeating steps 3-5 the most often out of all other steps (making sure that the branch you’re working on is up to date)
5. If you are having an issue of not being able to rebase your working branch because you have uncommitted changes, then just
rebase your master branch (so that it's up to date) and feel free to continue working on your work branch.
It should be OK to rebase your work branch right before you want to add/commit any changes you made.



GIT COMMIT MESSAGE:
1. always add a prefix in parentheses (eg. "(add) feature", "(remove) itemname.js", "(fix) issue")
2. the comments should be in present tense