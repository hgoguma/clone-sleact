import { Dispatch, SetStateAction, useCallback, useState } from 'react';


// any 또는 generic 선언
// any 쓰는 거 비추
// return 타입을 다시 type 변수로 빼놓을 수 있음
type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];
const useInput = <T = any>(initialData: T): ReturnTypes<T> => {
    const [value, setValue] = useState(initialData);
    const handler = useCallback((e: any) => {
        setValue(e.target.value);
    }, []);

    return [value, handler, setValue];

}

export default useInput;