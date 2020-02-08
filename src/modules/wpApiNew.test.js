import { wpApiFetch } from "./wpApiFetch";

function fetch(params) {
    wpApi(params)
}

describe("wpApi", () => {
  
    test('①objectがかえってくるよpromiseで', () => {
        expect.assertions(1)
        return wpApi().then(res =>{
            expect(res).toBe({})
        })
    })
        
    // test('②objectがかえってくるよpromiseで', () => {
    //      expect.assertions(1);
    //      return wpApi().catch(e => expect(e).toMatch('error'));

    
    // });

})