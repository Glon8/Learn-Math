const englishPackage = {
    navBar: {
        main: 'Learn Math',
        hints: 'Hints',
        topScores: 'Top Scores',
        profile: 'Profile',
        schools: 'Schools'
    },
    navMenu: {
        trigger: 'Menu',
        userStatus: 'user',
        userStatusLocal: 'Local',
        userStatusOnline: 'Online',
        userStatusNegative: 'No user connected!',
        signUp: 'Sign Up',
        signIn: 'Sign In',
        signOut: 'Sign Out',
        mode: 'Mode',
        languages: {
            trigger: 'Languages',
            en: 'EN',
            he: 'HE',
            ru: 'RU'
        },
        settings: {
            trigger: 'Lesson Settings',
            '123': 'Display Score',
            '124': 'Sign Correct Answers',
            '125': 'Disable Correct Fields',
            '126': 'Add & Sub Columns Only',
            '127': 'Add & Sub Difficulty Spike',
            '128': 'Mult & Div Columns Only',
            '129': 'Mult & Div Difficulty Spike',
        },
        position: {
            trigger: 'Menu Position',
            top: 'Top',
            bottom: 'Bottom',
            right: 'Right',
            left: 'Left'
        }
    },
    topScores: {
        topScoresTitle: 'TOP SCORES',
        progressTitle: 'GRADES',
        share: 'Share my grades',
        remove: 'Remove me from top list',
        compare: 'Compare with my grades',
        empty: 'Whoops! Something went wrong or no users shared their scores.'
    },
    schools: {
        schoolsTopicTitle: 'SCHOOLS TOPICS',
        innerTitle: 'Select topic that you would like to exercise at!',
        elementarySchool: 'Elementary-School',
        highSchool: 'High-School'
    },
    profile: {
        profileTitle: 'PROFILE',
        progressTitle: 'GRADES',
        elementarySchool: 'Elementary-School',
        highSchool: 'High-School',
        share: 'Share my grades',
        remove: 'Remove me from top list',
        convert: 'Convert user to online',
        delete: 'Delete my user',
        edit: 'Edit Profile'
    },
    hints: {
        hintsTitle: 'HINTS',
        schoolsTopicTitle: 'SCHOOLS TOPICS',
        elementarySchool: 'Elementary-School',
        highSchool: 'High-School',
        teach: 'Discuss With Teach!',
        placeholder: 'Ask teach!',
        limitation: 'Max 350 characters',
        user: 'User:',
        teacher: 'Teacher:',
        teacherWelcome: 'Its a chat with virtual teach! Ask it freely about math topics and exercises struggle!',
        teacherWait: 'Await for teacher to respond, please...',
    },
    exercise: {
        title: 'Exercise',
        explanation: 'Solve exercises to recieve a grade! (Max grade is 100)',
        done: 'Done',
    },
    sign: {
        inTitle: 'SIGN IN',
        upTitle: 'SIGN UP',
        resetTitle: 'PASSWORD RESET',
        send: 'Send',
        signUp: 'SIGN UP!',
        signUpLabel: 'Have no accout?',
        signIn: 'SIGN IN!',
        signInLabel: 'Get back to sign-in!',
        forgotPass: 'RESET!',
        forgotPassLabel: 'Forgot password?',
        offline: 'Is OFFLINE user?',
        offlineExp: ('NOTE: To create an offline user email or password are not rquired.' +
            'It will be stored in your cookies for a week, if you clear cookies or switch' +
            'user, your progress will be gone. To save the progress, you can sign up as an online user.'),
        secretPlaceholder: 'Yours secret question',
    },
    ending: {
        title: 'Summary',
        subTitle: {
            one: 'Splendid!!',
            two: 'Well Done!!',
            three: 'Congratulations!!',
            four: 'You made it!!',
        },
        prefix: 'Lets see... ',
        negVoca: {
            one: 'aaawww.... you could be done better!',
            two: 'it isnt great, dont give up! Try again!',
            three: 'focus, you can do better than this!',
            four: 'try to catch the tail! Try over again!',
        },
        posVoca: {
            one: 'cool! Nailed it! Try it a bit harder now!',
            two: 'you imporoved, or at least didnt loosed the total grade! Well done!',
            three: 'ho! Ho! Look at the grade! Spike difficulty awaits you in settings!',
            four: 'nice! On the next try exercises might be harder!',
        },
        curScore: 'Current Score',
        totScore: 'Total Score',
    },
    statics: {
        aiNote: 'Images were created by NN',
        error: {
            noUser: 'User',
            listMissing: 'Something missing... maybe a list.',
            exerciseMissing: 'Oooopps... its seems like something wrong, try to reconnect to internet or refresh the page.',
            shortDescMissing: 'Missing subtitle',
        },
        confirmation: {
            question: 'Are you sure?',
            true: 'Yes, Im sure!',
            false: 'No, await please!'
        },
        user: {
            name: 'Name',
            email: 'Email',
            password: 'Password',
            newPassword: 'New Password',
            confPassword: 'Confirm Password',
            status: 'Status',
            statusTrue: 'Online',
            statusFalse: 'Offline',
            shared: 'Scores',
            sharedTrue: 'Shared',
            sharedFalse: 'Not Shared',
            secret: 'Question',
            answer: 'Answer'
        },
        topics: {
            sum_substract: 'sum & substract',
            multiply_divide: 'multiply & divide',
            mixed: 'mixed',
            power_root: 'power & root',
            fraction_fractionMixed: 'fractions',
            forms_sizes: 'forms & sizes',
            exam_basic: 'exam: basic',
            equasions_basic: 'equations: basic',
            equations_two_more: 'equasions: two & more',
            verbal_problems: 'verbal problems',
            geometry: 'geometry',
            quadratic_equation: 'quadratic equation',
            circles: 'circles',
            exam_advanced: 'exam: advanced'
        },
        shortDesc: {
            sum_substract: 'In this topic we will look at what numbers are made of, and how each digit has its own weight. We will '
                + 'see how these digit weights help us when we calculate numbers in math.',
            multiply_divide: 'In this topic we will learn how to perform multiplication with longer digits and how to use the long '
                + 'division method. More advanced themes, like fractions, will be covered separately.',
            mixed: 'This topic will demonstrate the order of operations in math (PEMDAS/BODMAS). We will practice using '
                + 'addition and subtraction, multiplication and division, and the basic use of brackets.',
            power_root: 'In this short topic we will cover powers (multiplying the same number by itself) and roots (dividing a '
                + 'number to find its base). We will also look at simple and handy rules that make working with them easier.',
            fraction_fractionMixed: 'In this long but interesting topic, we will use our knowledge to solve fractions and learn many useful '
                + 'tricks to simplify them.',
            forms_sizes: 'This topic will give a simple introduction to the world of shapes, showing how to find perimeters, '
                + 'calculate areas, and measure angles.',
            exam_basic: 'This basic exam covers all elementary school themes, from simple addition and subtraction to shapes '
                + 'and angles. Study hard, because it won’t be easy!',
            equasions_basic: 'This theme will take us deeper into the world of numbers, helping us understand negative numbers and '
                + 'explore new ways to use the knowledge we already have, such as equations, and how they affect everything we’ve learned so far.',
            equations_two_more: 'This short and easy topic teaches how to solve two or more equations that are linked to each other.',
            verbal_problems: 'In this topic we will cover verbal problems in mathematics, including speed, time, productivity, and '
                + 'more, and see how they connect and affect each other.',
            geometry: 'In this topic we will dive deeper into the world of geometry. We will learn how to link the size of a shape '
                + 'to its angles and cover basic trigonometry, including sine, cosine, and tangent.',
            quadratic_equation: 'This topic links the world of shapes with the world of numbers. We will learn to read graphs, use '
                + 'quadratic equations, and see the connection between what we observe and the math behind it.',
            circles: 'This topic will cover circles, exploring the depth of the math behind them, how they connect almost all '
                + 'other topics, and the concept of infinite loops in the radian circle.',
            exam_advanced: 'This advanced exam covers all high school themes, from basic equations and circles, but also tests your '
                + 'fundamental knowledge and may include elementary school topics. Stay sharp and prepare, because it won’t be easy!'
        },
        customForm: {
            title: 'Custom form: Try yourself!',
            sign: 'sign',
            hund: 'hundreds',
            tens: 'tens',
            ones: 'ones',
            rem: 'reminder',
            fstNum: 'first number',
            secNum: 'second number',
            res: 'result / answer',
            but: 'Clear',
        },
        longDesc: {
            ones: 'ones:',
            tens: 'tens:',
            hund: 'hundreds',
            quotient: 'quotient:',
            reminder: 'reminder:',
            final: 'final answer:',
            sum_substract: {
                subTitle: 'Prologue:',
                desc: 'Before we talk about a solution, we need to understand what numbers are made of, '
                    + 'each number is made of digits:',
                desc2: 'To build numbers from digits, we use weights. There are many different weights '
                    + 'that digits can have, like ones, tens, hundreds, and so on. How do we know what number it is? '
                    + 'By looking at the biggest weight it has, for example:',
                lk: {
                    '1': 'biggest weight of ones',
                    '2': 'biggest weight of tens',
                    '3': 'biggest weight of hundreds',
                },
                desc3: 'It must be pointed out that even if a number has a digit with a very high weight, all smaller weights '
                    + 'must also be present, at least as zero, for example:',
                lk2: {
                    '1': 'number 23 have:',
                    '2': 'as tens',
                    '3': 'as ones',
                },
                desc4: 'As you can see, the 3 in the ones place has no 0 behind it because it is the smallest weight. Also, from '
                    + 'the example, you can see that we take the 0 in the tens place and add the 3 from the ones place.',
                subTitle2: 'Summary:',
                desc5: 'Summary is very simple: we take a digit by its weight and add it to the same weight of another '
                    + 'number, usually starting with the smallest ones and then moving to the bigger weights. For example:',
                desc6: 'In bigger numbers, like numbers with tens weight, it will look like this:',
                desc7: 'With this, you can solve and understand simple math. But here is another concept: the remainder. '
                    + 'A remainder is what is left over for the next weight, for example:',
                desc8: 'We take two numbers with a weight of ones, each equal to 5. When we add them together, we get 10, '
                    + 'which is a number with a weight of tens, not ones. What we created here is a remainder: we counted up '
                    + 'to 9, and then the tens weight began. So the ones weight becomes 0, and we have a remainder of 1, '
                    + 'which becomes our tens weight. If we already have a tens weight, we add the remainder to it, like this:',
                lk3: {
                    '1': 'ones without reminder:',
                    '2': 'reminder of tens:',
                },
                desc9: 'It is important to point out that we showed a 0 because the number 2, which has a weight of ones, has '
                    + 'no tens digit. That is why it is shown as zero. Usually, there is no need to write a zero at all.',
                subTitle3: 'Substraction:',
                desc10: 'Subtraction is the opposite of addition. It works the same way, but in reverse — very simple!',
                desc11: 'In the first example, we take two numbers with a weight of ones, 5 and 2, and subtract them. It is the '
                    + 'complete opposite of adding 2 and 3, and vice versa.',
                lk4: {
                    '1': 'ones without reminder:',
                    '2': 'reminder of tens:',
                },
                desc12: 'The second example is very similar. We have a number with a weight of tens, 17, and a number with a '
                    + 'weight of ones, 6. We subtract the ones weight of the second number, 6, from the ones weight of the tens '
                    + 'number, 7, which gives 1. The tens weight stays as 1, so the answer is 11.',
                desc13: 'In the third example, it is the same concept of a remainder, and it shows a few ways to calculate it. The '
                    + 'first way is to subtract the ones weighted number from each weight of the bigger number, like this:',
                desc14: 'This way, we see something unusual: the number with a weight of ones becomes negative. This is normal, '
                    + 'though negatives are not covered in this topic, so it is just important to point out. Now, all we do is subtract '
                    + 'the negative ones from the remaining tens-weighted number, and that’s it! Easy! '
                    + 'The second way to solve it is much easier and avoids confusion with negatives. If we subtract from a bigger '
                    + 'number, we take the next digit with the highest weight, like this:',
                desc15: 'This way, it is much simpler! We don’t start from the ones weight, but subtract the ones from the next '
                    + 'weight, which is weight of tens. This gives us 5, and all we do is add the remaining ones weight — 2, which stayed '
                    + 'from 12 — to the 5, and getting 7. That’s it!'
            },
            multiply_divide: {
                subTitle: 'Prologue:',
                desc: 'Just before we begin this exciting topic, please review numbers, weights, and remainders from the '
                    + 'addition and subtraction theme, because these keywords will come up again. Here is a quick reminder '
                    + 'about multiplying by ten:',
                desc2: 'What this shows is that each time we multiply by ten, we add a 0 at the end. When we divide by ten, we '
                    + 'usually remove a 0 from the end.',
                desc3: 'We will also touch on fractions here, but the full topic will be on a separate page.',
                subTitle2: 'Multiplication:',
                desc4: 'Multiplication isn’t as hard as it seems, especially if you are familiar with the basic multiplication table up '
                    + 'to ten. On this website, you will find many exercises, mostly with numbers in the tens or higher, so we will '
                    + 'skip the basic multiplication and move on to more complex ones. Let’s say we have a tens number being '
                    + 'multiplied by another number, for example:',
                desc5: 'Here, we multiply the number with the smaller weight by each weight of the bigger weighted number. '
                    + 'This gives us the solution: we multiply the number with a weight of ones — 2 — by the ones weight in the '
                    + 'tens-number — 12 — and get 4. Then we multiply the tens weight by the same number as well, which '
                    + 'means the tens of 1 multiplied by the ones of 2, giving 2.',
                desc6: 'The same process happens with larger numbers: you pick one of the numbers and multiply it by the '
                    + 'weights of the other number, with slight adjustments. So, let’s see another example:',
                lk: {
                    '1': 'added weight to tens:',
                },
                desc7: 'That’s all about multiplication! Very short and easy! It’s important to point out that larger numbers may '
                    + 'seem more complicated, but the length doesn’t matter — in the end, you just follow the same steps, and '
                    + 'they are very easy too!',
                subTitle3: 'Try to multiply this:',
                subTitle4: 'Division:',
                desc8: 'Division is the opposite of multiplication and usually involves fractions (fractions will be covered as a '
                    + 'separate topic). The best way to divide numbers is by long division. In long division, we start from the '
                    + 'biggest weight in the dividend. Let’s see how it works:',
                desc9: 'Divider — the number we divide by.',
                desc10: 'Dividend — the number that is being divided.',
                desc11: 'Quotient — the whole number that shows how many times the divider fits into the dividend.',
                desc12: 'Remainder — the number that shows what is left over or the fraction after the division.',
                lk2: {
                    '1': 'Full answer: quotient',
                    '2': 'reminder',
                    '3': 'divider',
                },
                desc13: 'Important rule: you cannot divide by 0! This means the divider can never be 0.',
                desc14: 'In this topic, we won’t cover fractions, so there’s no need to focus on the remainder or the divider. '
                    + 'Example: let’s say we multiplied 5 by 20, like this:',
                lk3: {
                    '1': 'added weight to tens:',
                },
                desc15: 'Now we want to divide, using long division 120 by 5, like this:',
                lk4: {
                    '1': 'the biggest weight is hundreds',
                    '2': 'and we know that:',
                    '3': 'there is no reminder left',
                    '4': 'the next is tens',
                    '5': 'there is no reminder left',
                    '6': 'the next is ones',
                },
                desc16: 'That’s all for division in this topic. A deeper explanation will be covered in the fractions topic!',
                subTitle5: 'Try to divide this:',
            },
            mixed: {
                subTitle: 'Order Of Operations:',
                desc: 'The order of operations, or PEMDAS (Parentheses, Exponents, Multiplication/Division,Addition/Subtraction), gives a rule '
                    + 'so we know in which order to perform mathematical operations. For example, how would you solve this one?',
                desc2: 'You might just start casually from the left, and that’s it, but that would not be correct. In math, there is a '
                    + 'specific order for operations, and it looks like this:',
                lk: {
                    '1': 'Parentheses/Brackets',
                    '2': 'Exponents/Powers And Roots',
                    '3': 'Multiplication And Division',
                    '4': 'Sum And Substract',
                },
                desc3: 'If we try to solve it without any rules, going from left to right, we would get this, which is WRONG:',
                desc4: 'It’s WRONG because the order is not followed. First, we do the multiplication, and then the addition, like this:',
                desc5: 'This is the CORRECT one. Now look how the answer changed from 22 to 17 because we followed the '
                    + 'Order of Operations. Here is another example with brackets. You can try to solve it without any order, '
                    + 'going from left to right, and you would get 3.',
                desc6: 'The correct answer, though, will be 15, and here’s why: first, we solve the brackets, and then the rest, like this:',
                desc7: 'That’s all about the Order of Operations! It’s crucial to follow the order correctly when doing math. Good '
                    + 'luck with your exercises!',
            },
            power_root: {
                subTitle: 'Powers:',
                desc: 'Powers mean how many times a number is multiplied by itself. Let’s see an example: 3 to the power of 2, '
                    + 'which means 3 multiplied by itself once, like this:',
                lk: {
                    '1': 'can be seen as:',
                },
                desc2: 'Another example:',
                lk2: {
                    '1': 'can be seen as:',
                },
                subTitle2: 'Roots:',
                desc3: 'Roots are the reverse of powers. We take a number and want to find the original number that was used '
                    + 'to create it. We do this by dividing it by the number we think is the original. That’s how we reverse a power:',
                lk3: {
                    '1': 'reverse:',
                },
                desc4: 'We basically asked: what number do we need to raise to the power of 2 to get 9? The answer is 3. Now, '
                    + 'let’s look at another example:',
                lk4: {
                    '1': 'first reverse:',
                    '2': 'second reverse:',
                },
                desc5: 'It’s important to mention that almost all positive numbers, including 0, have a root. Most of these roots '
                    + 'are fractions (fractions will be covered in the next topic), and roots usually give two answers at once: a '
                    + 'positive and a negative. In contrast, every number can have a power, even negative numbers (negative '
                    + 'numbers will be covered in the basic equations topic).',
                desc6: 'It’s important to show how roots are written:',
                lk5: {
                    '1': 'root of two:',
                    '2': 'or',
                    '3': 'root of three and higher:',
                },
                desc7: 'Another important point: each number has a starting power of 1. For example:',
                lk6: {
                    '1': 'and so on...',
                },
                desc8: 'Every number raised to the power of 0 is 1, except 0, because there is no proof for it yet. So:',
                lk7: {
                    '1': 'no proof',
                    '2': 'and so on...',
                },
                subTitle3: 'Try to solve this exercise yourself:',
            },
            fraction_fractionMixed: {},
            forms_sizes: {},
            exam_basic: ('Basic exam includes themses of elementary school: sum and substract, multiplication and divition, aka mixed, powers and roots, ' +
                'fractions and forms and sizes.'),
            equasions_basic: {},
            equations_two_more: {},
            verbal_problems: {},
            geometry: {},
            quadratic_equation: {},
            circles: {},
            exam_advanced: ('Advanced exam includes mainly themes of high school: equasions, equasions two and more, verbal problems, geometry,' +
                'quadratic equasion and circles. But, it might contain themes from elementary school too.')
        },
        exerciseForms: {
            sum_substract: '',
            multiply_divide: '',
            mixed: '',
            power_root: '',
            fraction_fractionMixed: '',
            forms_sizes: '',
            exam_basic: '',
            equasions_basic: '',
            equations_two_more: '',
            verbal_problems: '',
            geometry: '',
            quadratic_equation: '',
            circles: '',
            exam_advanced: ''
        }
    }
}

export default englishPackage;