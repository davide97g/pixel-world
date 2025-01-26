const primaryColors = [
    { id: '#FF0000', name: 'red' },
    { id: '#00FF00', name: 'green' },
    { id: '#0000FF', name: 'blue' },
    { id: '#FF00FF', name: 'magenta' },
    { id: '#00FFFF', name: 'cyan' },
    { id: '#FFFF00', name: 'yellow' }
];

function generateShades() {
    const shades = [];
    primaryColors.forEach(color => {
        for (let i = 90; i >= 0; i -= 10) {
            const lightShade = {
                id: shadeColor(color.id, i),
                name: i===0? color.name :`${color.name} light ${i}%`,
                primaryColorId: color.id
            };
            shades.push(lightShade);

            if(i === 0) continue;
            const darkShade = {
                id: shadeColor(color.id, -i),
                name: `${color.name} dark ${i}%`,
                primaryColorId: color.id
            };
            shades.push(darkShade);
        }
    });
    return shades;
}

function shadeColor(color, percent) {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1).toUpperCase()}`;
}

const shades = generateShades();
console.log(shades);

// generate a csv file  
const fs = require('fs');
const path = require('path');

const csvString = shades.map(shade => `${shade.id},'${shade.name}',${shade.primaryColorId}, BASIC`).join('\n');

fs.writeFileSync(path.join(__dirname, 'shades.csv'), csvString);
