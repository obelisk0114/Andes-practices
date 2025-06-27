import java.util.PriorityQueue;
import java.util.Collections;

import java.util.List;
import java.util.ArrayList;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;

class InputPairs {
    int P;
    int K;
    int L;
    int[] frequency;

    public InputPairs(int P, int K, int L, int[] frequency) {
        this.P = P;
        this.K = K;
        this.L = L;
        this.frequency = frequency;
    }
}

public class Practice_04 {
    public long minimumNumberOfPresses(
        int maxNumOfLettersOnKey,
        int numOfKeys,
        int numOfLetters,
        int[] frequencyOfEachLetters
    ) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int i : frequencyOfEachLetters) {
            pq.offer(i);
        }

        long res = 0;
        int remainKeys = numOfKeys;
        int pressCount = 1;
        for (int i = 0; i < numOfLetters; i++) {
            res += pressCount * pq.poll();
            remainKeys--;

            if (remainKeys == 0) {
                remainKeys = numOfKeys;
                pressCount++;
            }
        }

        return res;
    }

    public List<InputPairs> readFile(String filePath)
      throws FileNotFoundException, IOException {
        File file = new File(filePath);
        BufferedReader br = new BufferedReader(new FileReader(file));

        String s = br.readLine();
        
        int numOfTestcase = Integer.parseInt(s);
        List<List<Integer>> temp = new ArrayList<>();
        while ((s = br.readLine()) != null) {
            String[] each = s.split(" ");
            List<Integer> list = new ArrayList<>();
            
            for (int i = 0; i < each.length; i++) {
                int conversion = Integer.parseInt(each[i]);
                list.add(conversion);
            }

            temp.add(list);
        }
        
        List<InputPairs> res = new ArrayList<>(numOfTestcase);
        for (int i = 0; i < temp.size(); i += 2) {
            List<Integer> firstLine = temp.get(i);
            List<Integer> secondLine = temp.get(i + 1);

            int[] f = new int[secondLine.size()];
            for (int j = 0; j < f.length; j++) {
                f[j] = secondLine.get(j);
            }

            InputPairs pair = new InputPairs(
                firstLine.get(0),
                firstLine.get(1),
                firstLine.get(2),
                f
            );

            res.add(pair);
        }

        br.close();
        return res;
    }

    public static void main(String[] args) {
        Practice_04 practice_04 = new Practice_04();

        // int P1 = 3;
        // int K1 = 2;
        // int L1 = 6;
        // int[] frequency1 = {8, 2, 5, 2, 4, 9};

        // int res1 = practice_04.minimumNumberOfPresses(P1, K1, L1, frequency1);
        // System.out.println(res1);

        // int P2 = 3;
        // int K2 = 9;
        // int L2 = 26;
        // int[] frequency2 = {1, 1, 1, 100, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 11, 11, 11, 11, 1, 1, 1, 100};

        // int res2 = practice_04.minimumNumberOfPresses(P2, K2, L2, frequency2);
        // System.out.println(res2);

        // String filePath = "C:\\Users\\TCC\\Downloads\\practice4\\A-small-practice.in";
        String filePath = "C:\\Users\\TCC\\Downloads\\practice4\\A-large-practice.in";
        List<InputPairs> readInput = practice_04.readFile(filePath);
        for (int i = 0; i < readInput.size(); i++) {
            InputPairs cur = readInput.get(i);
            long curRes = practice_04.minimumNumberOfPresses(cur.P, cur.K, cur.L, cur.frequency);
            System.out.println(curRes);
        }
    }
}
