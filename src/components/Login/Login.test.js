import {validCredentials} from './Login.js'

test('Only allows username demo and password demo to enter', ()=>{
    expect(validCredentials('demo', 'demo')).toBe(true);
    expect(validCredentials('somethingElse', 'somethingElse')).toBe(false);
});
