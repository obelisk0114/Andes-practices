import java.util.List;
import java.util.ArrayList;
import java.util.Deque;
import java.util.ArrayDeque;

public class Practice_02 {
    public List<Integer> markedUnpaired(String s) {
        List<Integer> res = new ArrayList<>();
        Deque<Integer> indexStack = new ArrayDeque<>();

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                indexStack.offerLast(i);
            }
            else if (ch == ')') {
                if (indexStack.isEmpty()) {
                    res.add(i);
                }
                else {
                    indexStack.pollLast();
                }
            }
        }

        while (!indexStack.isEmpty()) {
            int idx = indexStack.pollFirst();
            res.add(idx);
        }

        return res;
    }

    public static void main(String[] args) {
        Practice_02 practice_02 = new Practice_02();
        String s = "((A+B)(";
        List<Integer> res = practice_02.markedUnpaired(s);

        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < res.size()) {
            int length = sb.length();

            if (length != res.get(i)) {
                sb.append(" ");
            }
            else {
                sb.append("^");
                i++;
            }
        }

        System.out.println(s);
        System.out.println(sb.toString());
    }

}
