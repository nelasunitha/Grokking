Introduction
This pattern describes an efficient technique to deal with overlapping intervals. In a lot of problems involving intervals, we either need to find overlapping intervals or merge intervals if they overlap.

Given two intervals (‘a’ and ‘b’), there will be six different ways the two intervals can relate to each other:

 'a' & 'b' do not overlaps
 'a' & 'b'overlaps 'b' ends after 'a'
 'a' completely overlaps 'b
 'a' & 'b'overlaps 'a' ends after b
 'b' completely overlaps 'a'
 'a' & 'b'do not overlaps


Understanding the above six cases will help us in solving all intervals related problems. Let’s jump onto our first problem to understand the Merge Interval pattern