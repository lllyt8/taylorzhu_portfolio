import { BlogPost } from "../../types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "RESTful API Design Best Practices",
    slug: "restful-api-design-best-practices",
    excerpt:
      "Explore principles and patterns for designing high-quality RESTful APIs to help you build better web services.",
    coverImage: "/images/blog/api-design.jpg",
    date: "2025-04-11",
    author: {
      name: "Taylor Zhu",
      avatar: "/profile_pic.jpg",
    },
    categories: ["web", "architecture"],
    tags: ["API", "REST", "Web Development", "Backend"],
    readTime: 8,
    featured: true,
    content: `
# RESTful API Design Best Practices

Good API design is crucial for applications with separated frontend and backend...

## Using Appropriate HTTP Methods

GET, POST, PUT, DELETE each has its purpose...

## Version Control is Important

Always include version information in your API...

## Standardized Error Handling

Consistent error response formats can greatly improve development experience...
    `,
  },
  {
    id: "2",
    title: "Data Architecture in Energy Storage Systems",
    slug: "data-architecture-in-energy-storage",
    excerpt:
      "How to design data architecture to support monitoring, analysis, and optimization needs of modern energy storage systems.",
    coverImage: "/images/blog/energy-data.jpg",
    date: "2025-04-22",
    author: {
      name: "Taylor Zhu",
      avatar: "/profile_pic.jpg",
    },
    categories: ["energy", "architecture"],
    tags: ["Energy Storage", "Data Architecture", "Time Series Database"],
    readTime: 12,
    featured: true,
    collectionId: "energy-systems",
    chapterId: "data-management",
    order: 1,
  },
  {
    id: "3",
    title: "React Performance Optimization Techniques",
    slug: "react-performance-optimization",
    excerpt:
      "Practical React application performance optimization strategies, from component rendering to state management.",
    coverImage: "/images/blog/react-performance.jpg",
    date: "2025-04-04",
    author: {
      name: "Taylor Zhu",
      avatar: "/profile_pic.jpg",
    },
    categories: ["web", "performance"],
    tags: ["React", "Performance Optimization", "Frontend"],
    readTime: 10,
    featured: false,
  },
  {
    id: "4",
    title: "Best Practices for Planning Elasticsearch Indices",
    slug: "elasticsearch-index-planning-best-practices",
    excerpt:
      "A comprehensive guide to efficiently plan and optimize Elasticsearch indices for better performance and cluster stability.",
    coverImage: "/images/blog/elasticsearch-index.jpg",
    date: "2025-03-20",
    author: {
      name: "Taylor Zhu",
      avatar: "/profile_pic.jpg",
    },
    categories: ["technology", "architecture", "performance"],
    tags: [
      "Elasticsearch",
      "Index Optimization",
      "Data Architecture",
      "Performance Tuning",
    ],
    readTime: 15,
    featured: true,
    content: `
  # Best Practices for Planning Elasticsearch Indices
  
  ## Table of Contents
  
  - I. Introduction
  - II. Understanding Elasticsearch Indices
  - III. Index Structure Deep Dive
    - 1. Aliases
    - 2. Mappings
    - 3. Field Types
    - 4. Field Selection Recommendations
    - 5. Comparison with Relational Databases
  - IV. Shard Architecture - Shards and Replicas
    - 1. What are Shards?
    - 2. Shard Planning
    - 3. Index Resource Consumption
  - V. Conclusion
  
  ## I. Introduction
  
  As Elasticsearch adoption grows across various business applications, ensuring cluster stability, management, and maintenance becomes increasingly challenging. Through monitoring day-to-day operations, we've noticed significant variations in users' understanding of Elasticsearch, often encountering non-standard index creation practices or index structures that lack proper planning.
  
  This article aims to provide a comprehensive understanding of Elasticsearch indices from concept to implementation, helping you optimize your cluster performance and avoid common pitfalls.
  
  ## II. Understanding Elasticsearch Indices
  
  ### Basic Concepts
  
  An index in Elasticsearch is a collection of documents with similar characteristics, comparable to a table in relational databases. Each index has a unique name and ID and can be configured with different parameters and mappings to suit various business scenarios.
  
  The smallest unit within an index is a document, which is a JSON-formatted data object containing actual data and its corresponding metadata. Documents can be structured, semi-structured, or unstructured. Indices are used in Elasticsearch for storing, retrieving, and analyzing data.
  
  According to the official documentation:
  
  > "The index is the fundamental unit of storage in Elasticsearch, a logical namespace for storing data that share similar characteristics. After you have Elasticsearch deployed, you'll get started by creating an index to store your data."
  
  > "An index is a collection of documents uniquely identified by a name or an alias. This unique name is important because it's used to target the index in search queries and other operations."
  
  ## III. Index Structure Deep Dive
  
  ![Index Structure](/images/blog/es-index-structure.png)
  
  ### Example Index Creation Structure
  
  \`\`\`json
  PUT /index_demo
  {
    "aliases" : {
      "index_demo_alias" : { }
    },
    "mappings" : {
      "properties" : {
        "id" : {
          "type" : "long"
        },
        "name" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "status" : {
          "type" : "keyword"
        },
        "createDate" : {
          "type" : "long"
        }
      }
    },
    "settings" : {
      "index" : {
        "refresh_interval" : "5s",
        "number_of_shards" : "3",
        "number_of_replicas" : "1"
      }
    }
  }
  \`\`\`
  
  About the \`ignore_above\` property:
  
  - The default value is typically 256 characters, meaning strings exceeding this length won't be indexed or stored
  - This parameter only applies to keyword fields used for filtering, sorting, and aggregation operations
  - The value is calculated in characters, including both English characters and other languages
  - Performance benefit: By limiting field length, you can reduce index size and query time
  - Resource optimization: For fields containing large amounts of data, like long strings in log files, \`ignore_above\` prevents unnecessary storage and indexing
  
  ### 1. Aliases
  
  Aliases are managed by the master node within the cluster state. If you have an alias named "customer_data" pointing to an index named "customer_index_v1", the overhead is just an additional key in the cluster state mapping that maps "customer_data" to the specific index string. This makes aliases much lighter compared to indices, allowing you to maintain thousands without negatively impacting your cluster.
  
  According to the official documentation:
  
  > "An alias points to one or more indices or data streams. Most Elasticsearch APIs accept an alias in place of a data stream or index name.
  > 
  > Aliases enable you to:
  > - Query multiple indices/data streams together with a single name
  > - Change which indices/data streams your application uses in real time
  > - Reindex data without downtime"
  
  It's recommended to add aliases to every index, especially for facilitating seamless reindexing operations. While aliases can be added during index creation or afterward, it's best practice to specify them during creation to avoid code modifications and redeployments during reindexing.
  
  #### Ways to Add Aliases
  
  1. During index creation:
  
  \`\`\`json
  PUT /customer_index
  {
      "settings" : {
          "number_of_shards" : 1,
          "number_of_replicas" : 1
      },
      "aliases":{"customer_data":{}},
      "mappings" : {
          "properties" : {
              "name" : { 
                  "type" : "text" 
              },
              "created_at": {
                  "type": "date",
                  "format": "yyyy-MM-dd HH:mm:ss"
             }
          }
      }
  }
  \`\`\`
  
  2. For existing indices:
  
  \`\`\`json
  POST /_aliases
  {
    "actions": [
      {
        "add": {
          "index": "customer_index",
          "alias": "customer_data"
        }
      }
    ]
  }
  \`\`\`
  
  3. Swapping aliases:
  
  \`\`\`json
  POST /_aliases
  {
    "actions": [
      {
        "add": {
          "index": "customer_index_v2",
          "alias": "customer_data"
        },
        "remove": {
          "index": "customer_index_v1",
          "alias": "customer_data"
        }
      }
    ]
  }
  \`\`\`
  
  ### 2. Mappings
  
  When creating an index, you need to define the document's structure - this is called mapping. In mappings, once field types are set, they cannot be changed because Elasticsearch has already built specific index structures based on those types. Mappings allow you to add new fields to documents. Additionally, Elasticsearch provides automatic mapping functionality - when adding data, if a field hasn't been typed, Elasticsearch will infer the most likely type from the actual data.
  
  ### 3. Field Types
  
  Field types define data formats and indexing methods, determining how fields are stored, searched, and aggregated. Let's examine three common field types: text, keyword, and numeric (integer, long).
  
  #### Text Fields
  
  Text fields are central to full-text search in Elasticsearch. They split text into individual terms through analyzers and store them in inverted indices, ideal for searching and analyzing unstructured text. However, because they're processed by analyzers, they're unsuitable for sorting and aggregation operations.
  
  **Characteristics:**
  
  - Full-text search: Primarily used for storing and indexing readable text content like email bodies, product descriptions, and articles
  - Tokenization: Support tokenizers that split strings into terms for indexing
  - Unsuitable for sorting/aggregation: Due to analyzer processing, original strings can't be directly used for these operations
  - Multi-field mapping: Can be combined with keyword fields to support both full-text search and exact matching
  
  **Use Cases:**
  
  - Full-text search: Suitable for fuzzy text searches in search engines, news sites, and product catalogs
  - Text analysis: Can be combined with analyzers for text similarity searches or scoring
  - Log analysis: For analyzing and searching text in log files
  - Content management: For storing and searching documents in content management systems
  
  **Best Practice:** Use both text and keyword versions of the same field when you need both full-text search and aggregation/sorting capabilities.
  
  #### Keyword Fields
  
  Keyword fields are used for storing and indexing structured data.
  
  **Characteristics:**
  
  - No tokenization: Keyword fields store values as-is without splitting them
  - Exact matching: Ideal for precise matching queries like finding specific email addresses or status codes
  - Support for sorting and aggregation: Can be used for these operations
  - Storage efficiency: Lower storage overhead as no tokenization is needed
  
  **Use Cases:**
  
  - Exact queries: For matching specific values like email addresses, IDs, or status codes
  - Sorting and aggregation: When data needs to be sorted or aggregated
  - Tags and categories: For storing structured data like user profile tags
  - Unique strings: For storing values with uniqueness requirements like order numbers
  
  #### Numeric Fields
  
  These include long, integer, short, byte, double, and float.
  
  **Characteristics:**
  
  - Integer types: Suitable for range queries, sorting, and aggregation
  - Floating-point types: For high-precision calculations
  - Appropriate sizing: Choose smaller types when possible to save storage space
  
  **Tip:** When the business use case is clear, consider using keyword fields instead of numeric fields for better term query performance. If uncertain, use multi-fields.
  
  ### 4. Field Selection Recommendations
  
  - For fields that don't require fuzzy searching, use keyword types to improve query speed
  - When uncertain about query needs, set up multi-field mappings with keyword subtypes
  - Use keyword types for enumeration fields without special business requirements
  - For fields not requiring range queries, use keyword types (which support aggregation and sorting)
  - Avoid using text fields for wildcard searches - use dedicated wildcard field types for better performance
  - Avoid aggregations on text fields when possible, as fielddata greatly increases memory usage
  - For Chinese text analysis, don't use default analyzers; prefer ik_smart over ik_max_word which generates redundant tokens
  - Use date/long types for time fields unless you're only doing exact matching
  - Keyword fields aren't suitable for wildcard queries - use wildcard field types instead
  
  Additional tips:
  
  - When using 'now' in date queries, caching is ineffective - use absolute time values instead
  - ES default maximum field count is 1000, but aim to keep it under 100; don't write unnecessary fields to ES
  - Set index=false for fields that don't need indexing to reduce computational overhead
  - Avoid immediate refresh after each write as it causes high disk I/O and CPU consumption
  
  ### 5. Comparison with Relational Databases
  
  | Elasticsearch | Relational Database |
  |---------------|---------------------|
  | Index | Database |
  | Mapping | Schema |
  | Document | Row |
  | Field | Column |
  | Query DSL | SQL |
  | GET/PUT/POST/DELETE API | CRUD Operations |
  
  ## IV. Shard Architecture - Shards and Replicas
  
  ### 1. What are Shards?
  
  **Basic Concept**
  
  A shard is a data management unit in Elasticsearch. Elasticsearch internally routes documents to different storage units according to routing rules (typically the hash value of the document's _id modulo the number of shards). These storage units are shards. Think of them like partitioned tables in MySQL.
  
  An Elasticsearch logical shard is a Lucene index. An ES index is a collection of shards. When ES searches an index, it sends queries to each shard (Lucene index) belonging to that index, then merges the results from each shard into a global result set.
  
  **Shard Types**
  
  Shards are divided into primary shards and replica shards:
  
  - Primary shards: Basic data storage units for the index, each containing a portion of the index's data. Each can be moved and replicated to different nodes in the cluster.
  - Replica shards: Complete copies of primary shards, used for redundant storage and disaster recovery. In adequate clusters, replica shards and their corresponding primary shards won't exist on the same node.
  
  Note: A single shard should not exceed the limit of 2,147,483,519 records.
  
  **Shard Functions**
  
  1. Primary Shards:
     - Data storage and writes: All documents are allocated to primary shards via routing algorithms; primary shards handle indexing, updating, and deleting operations
     - Scalability: Allowing horizontal scaling through node and shard distribution
     - Immutability: Primary shard count is set through the number_of_shards parameter during index creation and cannot be modified afterward
  
  2. Replica Shards:
     - High availability: When a node with a primary shard fails, its replica automatically upgrades to primary
     - Read load balancing: Replicas can handle query requests in parallel, increasing read throughput
     - Dynamic adjustment: Replica count can be configured dynamically through the number_of_replicas parameter
  
  ### 2. Shard Planning
  
  Proper shard planning is crucial to avoid slow queries, data skew, and wasted disk capacity. Having too many shards can negatively impact ES performance because each shard requires memory for index data and caching. Additionally, when queries involve multiple shards, ES needs to coordinate data between nodes, increasing network overhead and potentially reducing query and write performance.
  
  Different scenarios require different shard configurations:
  
  **Read-Intensive Scenarios**
  
  Single shard size: 20-40GB. Minimize shard count to reduce the "long-tail sub-request" issue where some sub-requests may be delayed due to node exceptions, Old GC, or network fluctuations, causing the entire request to respond slowly. Too many sub-requests also can't increase data node request throughput. Consider increasing replica count to improve query throughput.
  
  **Write-Intensive Scenarios**
  
  Single shard size: 10-20GB. Smaller shards benefit data writing. They maintain fewer segments than large shards, providing advantages in data refreshing and segment merging. With less data per shard, information can be cached in memory faster and persisted to disk more quickly with the refresh parameter.
  
  **Log Storage Scenarios**
  
  Consider the total daily data volume written to the cluster. Evaluate shard count based on data volume and data node count.
  Consider whether log storage needs to accommodate queries and aggregation performance.
  Based on log persistence strategy, generate indices by month/week/day and use ILM (Index Lifecycle Management) to manage log indices throughout their lifecycle.
  Consider setting replicas to 0 to reduce disk capacity costs.
  
  **Small Data Volume Scenarios**
  
  For indices with small data volumes, increasing shard count doesn't necessarily improve performance and may have negative effects.
  Increasing shard count raises cluster management overhead, including maintaining shard states and backup/recovery.
  It may cause uneven data distribution, affecting query performance.
  For small indices in query scenarios, typically set shards to 1 or 2 to avoid unnecessary overhead and performance issues.
  
  **General Guidelines**
  
  Plan and budget index data volume in advance based on business requirements.
  Shard count formula: Primary shards ≈ Total data volume / Single shard capacity limit (official recommendation is 10-50GB per shard, with document count under 100 million; for logging, this can be relaxed to 50-100GB).
  Important: Shard count should ideally be a multiple of the number of ES data nodes.
  Replica count: Increasing replicas improves read performance but slows writes (due to syncing more replicas).
  For time-series data or very large indices with hundreds of GB per shard, consider rolling indices with lifecycle management and index templates.
  Avoid custom routing values for shards as they easily cause data skew and add calculation overhead.
  Control shard count - too many shards increase cluster metadata management pressure and reduce system performance.
  Set total_shards_per_node to distribute index pressure across multiple nodes.
  
  ### 3. Index Resource Consumption
  
  **Shard Count and Memory Consumption**
  
  Each shard is an independent Lucene index requiring memory for inverted indices, caches, and other structures. Too many shards can cause:
  
  - Memory spikes: Each shard typically uses about 10-30MB of memory (including metadata) - thousands of shards could consume tens of GB
  - File handle exhaustion: Too many total shards can deplete file descriptors, triggering "too many open files" errors
  - CPU hotspots: Uneven shard distribution can cause some nodes to be overloaded
  
  **Segment Fragmentation**
  
  Shards consist of multiple segments, and having too many segments will:
  
  - Increase I/O pressure: Queries must traverse multiple segment files
  - Consume heap memory: Each segment loads some metadata into memory, potentially consuming gigabytes with millions of segments
  - Impact GC efficiency: Frequent segment merging can trigger Full GC cycles
  
  ## V. Conclusion
  
  Creating an effective index requires careful consideration of field type selection, whether to index and analyze fields, and determining the appropriate number of shards and replicas based on data scale and business growth patterns. Since index structure directly impacts cluster stability, we should develop the habit of treating index design as a critical component of our technical solutions.
  
  By following these best practices, you'll improve your Elasticsearch performance and avoid many common issues that lead to instability and poor performance.
    `,
  },
];
