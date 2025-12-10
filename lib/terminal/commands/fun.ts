import { Command } from '../types';
import { createCommand, addLine, addLines } from '../helpers';
export const hack: Command = createCommand('hack', 'Initiate hack', (_, { setLines, toggleMatrix }) => {
    addLines(setLines, ['Hacking started... access granted.', 'Try \'sudo\' for power.']);
    setTimeout(() => toggleMatrix(), 1000);
}, { category: 'fun', usage: 'hack' });
export const fortune: Command = createCommand('fortune', 'Random quote', (_, { setLines }) => {
    const q = ['Code is easy.', 'Talk is cheap.', 'Keep it simple.'];
    addLine(setLines, `💭 ${q[Math.floor(Math.random() * q.length)]}`);
}, { category: 'fun', usage: 'fortune' });
export const cowsay: Command = createCommand('cowsay', 'Cow says', (args, { setLines }) => {
    const m = args.join(' ') || 'Moo';
    addLines(setLines, [` < ${m} >`, '        \\   ^__^', '         \\  (oo)\\_______', '            (__)\\       )\\/\\', '                ||----w |', '                ||     ||']);
}, { category: 'fun', usage: 'cowsay [text]' });
export const matrix: Command = createCommand('matrix', 'Toggle rain', (_, { toggleMatrix }) => {
    toggleMatrix();
}, { category: 'fun', usage: 'matrix' });
export const sudo: Command = createCommand('sudo', 'Superuser do', (args, { setLines }) => {
    const cmd = args.join(' ');
    addLine(setLines, cmd ? `sudo: ${args[0]}: command not found` : 'usage: sudo [command]');
}, { category: 'fun', usage: 'sudo [command]' });
export const sl: Command = createCommand('sl', 'Steam locomotive', (_, { setLines }) => {
    addLines(setLines, ['    ====        ________                ___________ ', ' _D _|  |_______/        \\__I_I_____===__|_________|', '  |(_)---  |   H\\________/ |   |        =|___ ___|  ', '  /     |  |   H  |  |     |   |         ||_| |_||  ', ' |      |  |   H  |__--------------------| [___] |  ', ' | ________|___H__/__|_____/[][]~\\_______|       |  ', ' |/ |   |-----------I_____I [][] []  D   |=======|__']);
}, { category: 'fun', usage: 'sl' });
export const funCommands = { hack, fortune, cowsay, matrix, sudo, sl };
