const prompts = require('prompts');
prompts.override(require('yargs').argv);
const colors = require('colors');

const { rules, bundles } = require('./constants');

// hasRule
Array.prototype.hasRule = function (ruleIds) {
    for (let rule of ruleIds) {
        if (this.includes(rule)) {
            return true;
        }
    }
    return false;
}

const validateBasicRules = (rule, { age, student, income }) => {
    let valid = true;
    let errorMsg = [];

    // Check age
    if (rule.age) {
        if (Array.isArray(rule.age)) {
            if (rule.age[0] >= age || rule.age[1] <= age) {
                valid = false;
                errorMsg.push('Age condition doesn not satisfy!');
            }
        } else {
            if (age <= rule.age) {
                valid = false;
                errorMsg.push('Age condition doesn not satisfy!');
            }
        }
    }

    // Check income
    if (rule.income && income <= rule.income) {
        valid = false;
        errorMsg.push('Income condition does not satisfy!');
    }

    // Check student
    if (rule.student && student !== rule.student) {
        errorMsg.push('Student condition does not satisfy!');
        valid = false;
    }

    return {
        valid,
        errorMsg
    };
};

// Calculate highest valued & approriate bundle
const calculateBundle = ({ age, student, income }) => {
    let satisfiedRules = rules.filter(rule => {
        return validateBasicRules(rule, { age, student, income }).valid;
    });

    // Check debit card & return satisfied rules ids
    satisfiedRulesIds = satisfiedRules.filter(rule =>
        (rule.id !== 5) ||
        (rule.id === 5 && rule.includes.hasRule(satisfiedRules.map(r => r.id)))
    ).map(r => r.id);

    const satisfiedBundles = bundles.filter(bundle => {
        if (validateBasicRules(bundle, { age, student, income }).valid &&
            bundle.includes.every(elem => satisfiedRulesIds.indexOf(elem) > -1)) {
            return true;
        }
        return false;
    });

    const highestValuedBundle = satisfiedBundles.reduce((prev, current) => {
        return (prev.value > current.value) ? prev : current
    })

    return highestValuedBundle;
}

// Switch and validate new bundle
const switchBundle = (selectedBundle, recommendedBundle, response) => {

    let unusedRules = [], addinRules = [];

    selectedBundle.includes.map(rule => {
        if (!recommendedBundle.includes.includes(rule)) {
            addinRules.push(rule);
        } 
    });

    recommendedBundle.includes.map(rule => {
        if (!selectedBundle.includes.includes(rule)) {
            unusedRules.push(rule);
        }
    });

    const validateNewBundle = [
        selectedBundle,
        rules.filter(r => addinRules.includes(r.id))
    ].map(rule => validateBasicRules(rule, response));

    if (!validateNewBundle.filter(bundle => bundle.valid === false).length) {
        return {
            valid: true,
            addinRules,
            unusedRules
        }
    } else {
        let errorMsg = [];
        validateNewBundle.map(bundle => {
            if (!bundle.valid) {
                errorMsg = errorMsg.concat(bundle.errorMsg);
            }
        });
        return {
            valid: false,
            errorMsg
        }
    }
}

const startCLI = async () => {
    const response = await prompts([
        {
            type: 'number',
            name: 'age',
            message: 'How old are you?',
        },
        {
            type: 'select',
            name: 'student',
            message: 'Are you student?',
            choices: [
                { title: 'yes', value: true },
                { title: 'no', value: false },
            ],
        },
        {
            type: 'number',
            name: 'income',
            message: 'How is your income?',
        }
    ]);

    console.log(`
    * Your information:
        - Age: ${response.age}
        - Student? ${response.student}
        - Income: ${response.income}
    `.blue);
        
    const recommendedBundle = calculateBundle(response);

    console.log(`    * Recommended bundle for you: ${recommendedBundle.name}`.blue);

    const theRestBundles = bundles.filter(b => b.id !== recommendedBundle.id)

    const bundle = await prompts([
        {
            type: 'select',
            name: 'selected',
            message: 'Please choose a bundle that you wanna switch to:',
            choices:  theRestBundles.map(bundle => {
                return {
                    title: bundle.name,
                    value: bundle
                }
            })
        }
    ]);

    const switchedBundle = switchBundle(bundle.selected, recommendedBundle, response);
    if (switchedBundle.valid) {
        if (switchedBundle.addinRules.length) {
            console.log(`
    * Please add below products in order to switch bundle:
            `.blue)
            switchedBundle.addinRules.map(rule => {
                if (rules.map(r => r.id).includes(rule)) console.log(`       -  ${rules.filter(r => r.id === rule)[0].name}`.blue)
            })
        }

        if (switchedBundle.unusedRules.length) {
            console.log(`
    * Please remove below products in order to switch bundle:
            `.blue)
            switchedBundle.unusedRules.map(rule => {
                if (rules.map(r => r.id).includes(rule)) console.log(`       -  ${rules.filter(r => r.id === rule)[0].name}`.blue)
            })
        }
    } else {
        console.log(`
    * You are not able to switch to this bundle due to below reasons:
                `.red)
            switchedBundle.errorMsg.map(err => {
                console.log(`       -  ${err}`.red)
            });
    }
};

module.exports = {
    startCLI,
    calculateBundle,
    switchBundle
}