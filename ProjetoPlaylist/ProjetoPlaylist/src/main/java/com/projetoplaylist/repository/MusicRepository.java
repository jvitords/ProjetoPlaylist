package com.projetoplaylist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projetoplaylist.entities.Music;

@Repository
public interface MusicRepository  extends JpaRepository<Music, Long>{

	boolean existsByNameIgnoreCase(String name);
	List<Music> findByNameContainingIgnoreCase(String name);
}
